import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon/:id", ({ params }) => {
    console.log(`Captured a "GET /pokemon/${params.id}" request`);
    return HttpResponse.json({
      id: parseInt(<string>params.id, 10),
      name: params.id === "1" ? "Bulbasaur" : "Ivysaur",
      sprites: { front_default: `https://pokeapi.co/sprites/${params.id}.png` },
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    });
  }),
  http.get("https://pokeapi.co/api/v2/pokemon*", () => {
    console.log('Captured a "GET /pokemon" request');
    return HttpResponse.json({
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
        { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
        { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
      ],
    });
  }),
];
