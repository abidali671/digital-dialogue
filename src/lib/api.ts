/** Browser API helper — server-side Contentful responses are cached for 1 week. */
const API = {
  async get(path: string) {
    const res = await fetch(`/api${path}`);
    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }
    return { data: await res.json() };
  },
};

export default API;
