const axios = require('axios').default;
const cheerio = require('cheerio');

const URL = 'https://www.ncaa.com/rankings/football/fbs/associated-press';

const PROPS = {
  0: 'rank',
  1: 'school',
  2: 'record',
  3: 'points',
  4: 'previous',
};

const getProp = (i) => PROPS[i];

const fetchHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};

const parseResult = ($, element) => {
  const result = {};
  $(element)
    .find('td')
    .each((i, elm) => (result[getProp(i)] = $(elm).text()));

  return result;
};

const prettyPrint = (result) =>
  `${result.school} with a ${result.record} record`;

const scrape = async () => {
  const html = await fetchHtml(URL);
  const $ = cheerio.load(html);
  const results = $('#block-bespin-content')
    .find('tbody > tr')
    .toArray()
    .map((element) => parseResult($, element))
    .map((element) => prettyPrint(element));

  return results;
};
