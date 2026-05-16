import Insight from "../Models/Insights.js";

export const getData = async (req, res) => {
  try {
    const query = {};
    const {
      end_year,
      topic,
      sector,
      region,
      country,
      city,
      pestle,
      source,
      swot,
    } = req.query;

    if (end_year) {
      const numericEndYear = Number(end_year);
      query.end_year = Number.isNaN(numericEndYear)
        ? end_year
        : { $in: [numericEndYear, end_year] };
    }
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (region) query.region = region;
    if (country) query.country = country;
    if (city) query.city = city;
    if (pestle) query.pestle = pestle;
    if (source) query.source = source;
    if (swot) query.swot = swot;

    const data = await Insight.find(query).limit(500);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFilters = async (req, res) => {
  try {
    const [
      end_years,
      topics,
      sectors,
      regions,
      countries,
      cities,
      pestles,
      sources,
      swots,
    ] = await Promise.all([
      Insight.distinct("end_year"),
      Insight.distinct("topic"),
      Insight.distinct("sector"),
      Insight.distinct("region"),
      Insight.distinct("country"),
      Insight.distinct("city"),
      Insight.distinct("pestle"),
      Insight.distinct("source"),
      Insight.distinct("swot"),
    ]);

    res.json({
      end_years,
      topics,
      sectors,
      regions,
      countries,
      cities,
      pestles,
      sources,
      swots,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
