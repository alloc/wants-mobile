# wants-mobile

Parse request headers to see if a mobile-specific bundle is wanted.

Supports both Node.js and Web Workers.

### Usage

```ts
import wantsMobile from 'wants-mobile'
```

The `wantsMobile` function takes a headers object and returns true when a mobile-specific bundle should be served, otherwise false.

The headers object is expected to be:
  - a plain object with lowercase keys, or
  - an object whose `get(key)` method supports lowercase keys

It first checks the `Sec-CH-Mobile` header (part of the [WICG "Client Hints" proposal](https://github.com/WICG/ua-client-hints)). If defined, `wantsMobile` returns a boolean (true when `?1`, else false).

If that header is undefined, it then parses the `User-Agent` header using a small set of regular expressions, which can be found [here](https://github.com/alloc/wants-mobile/blob/8c701cb23ceb1570943e0167efd83adcae093e42/index.ts#L20-L38).
