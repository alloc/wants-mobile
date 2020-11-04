export default function wantsMobile(headers: Headers) {
  // https://github.com/WICG/ua-client-hints
  const hint = getHeader(headers, 'sec-ch-mobile')
  if (hint) {
    return hint == '?1'
  }
  const ua = getHeader(headers, 'user-agent')
  return typeof ua == 'string' && matchers.some(matcher => matcher.test(ua))
}

// Support web workers and node.js servers
type Headers = WebHeaders | PlainHeaders

/** The `name` must be lowercase. */
const getHeader = (headers: Headers, name: string) =>
  typeof headers.get == 'function'
    ? headers.get(name)
    : (headers as PlainHeaders)[name]

const matchers = [
  /* Android */
  /android/i,

  /* Mobile */
  /[^-]mobi/i,

  /* Tablet */
  /tablet/i,

  /* Huawei */
  /huawei/i,

  /* Firefox on iPad */
  /FxiOS\//,

  /* Amazon Tablet with Silk */
  /silk/i,
]

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8599802/types/node/http.d.ts#L7
type PlainHeaders = { [name: string]: string | string[] | undefined }

// https://developer.mozilla.org/en-US/docs/Web/API/Headers
type WebHeaders = { get(name: string): string | null }
