const fetchers = {
  getJSON: (url: string) => fetch(url).then((res) => res.json()),
} as const;

export default fetchers;
