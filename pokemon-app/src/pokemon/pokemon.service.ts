import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }
    if (!pokemon) {
      throw new NotFoundException(
        `pokemon with name, no or id "${term}" not exists`,
      );
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      const result = await this.pokemonModel.findOneAndUpdate(
        { _id: pokemon._id },
        updatePokemonDto,
        { new: true },
      );
      return result;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`pokemon with id ${id} not found`);
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `pokemon exists in db "${JSON.stringify(error.keyValue)}"`,
      );
    }
    throw new InternalServerErrorException();
  }
}
