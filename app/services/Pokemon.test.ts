import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { PokeApiClient } from "~/services/PokeApiClient";
import { PokemonService } from "~/services/PokemonService";
import { Pokemon } from "~/services/pokemon";

const { worker } = await import("~/mocks/browser");

beforeAll(() => {
  worker.listen();
});

describe("PokemonService", () => {
  let service: PokemonService;
  let pokeApiClient: PokeApiClient;

  beforeAll(() => {
    pokeApiClient = new PokeApiClient();
    service = new PokemonService(pokeApiClient);
  });

  beforeEach(() => {
    service.clearTeams();
  });

  afterAll(() => {
    worker.close();
  });

  it("should return a list of Pokemon", async () => {
    const response = await service.getPokemonList();
    expect(response.length).toBeGreaterThan(0);
  });

  it("should return an empty team for a new user", () => {
    const userId = "Cynthia 🔮";
    const result = service.getUserTeam(userId);

    expect(result).toEqual([]);
  });

  it("should add a Pokemon to the user's team", async () => {
    const userId = "Sacha 💵";
    const response = await service.getPokemonList();
    const pokemon: Pokemon = response[0];

    const result = service.togglePokemonInTeam(userId, pokemon);

    expect(result).toBe(true);
    expect(service.getUserTeam(userId)).toContain(pokemon);
  });

  it("should remove a Pokemon from the user's team", async () => {
    const userId = "Pierre 🍙";
    const response = await service.getPokemonList();
    const pokemon: Pokemon = response[0];

    service.togglePokemonInTeam(userId, pokemon); // Add
    const result = service.togglePokemonInTeam(userId, pokemon); // Remove

    expect(result).toBe(true);
    expect(service.getUserTeam(userId)).not.toContain(pokemon);
  });

  it("should not add more than 6 Pokemon to the user's team", async () => {
    const userId = "Ondine 🏖";
    const pokemonList = await service.getPokemonList();
    pokemonList.forEach((pokemon) => {
      service.togglePokemonInTeam(userId, pokemon);
    });

    const result = service.togglePokemonInTeam(userId, pokemonList[6]);
    expect(result).toBe(false);
    expect(service.getUserTeam(userId).length).toBe(6);
  });

  it("should clear the user's team", async () => {
    const userId = "Red 🔥";
    const pokemonList = await service.getPokemonList();
    const pokemon = pokemonList[0];

    service.togglePokemonInTeam(userId, pokemon);
    service.clearTeam(userId);

    expect(service.getUserTeam(userId)).toEqual([]);
  });
});
