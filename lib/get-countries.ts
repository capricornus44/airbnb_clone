import countries from 'world-countries'

const countriesFormatted = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLang: country.latlng,
  region: country.region
}))

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted

  const getCountryByValue = (value: string) =>
    countriesFormatted.find(country => country.value === value)

  return { getAllCountries, getCountryByValue }
}
