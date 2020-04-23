# TMDb

The Movie Database (TMDb) API wrapper.

# Examples

## Creating Wrapper Instance

```js
const wrapper = new TMDb('api key', { language: 'en', region: 'us' }).v3;
```

## Setting up Endpoints

```js
const movie = await wrapper.movieEndpoint({ id: 12345 });
```

```js
const show = await wrapper.tvEndpoint({ externalId: 'tt12345678' });
```

```js
const person = await wrapper.personEndpoint({ query: 'tom hardy' });
```

```js
const search = wrapper.searchEndpoint();
```

## Creating Requests


```js
const { details } = await movie.getDetails();
```

```js
const { details, credits } = await tv.getDetails({ append_to_response: 'credits' });
```

```js
await person.getImages();

const images = person.images;
```

```js
const results = await search.getMovies({ query: 'avengers' });
```
