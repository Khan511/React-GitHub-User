import React from "react";
import styled from "styled-components";
import useGlobalContext from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalContext();
  // console.log(repos);

  let languages = repos.reduce((total, currentItem) => {
    const { language, stargazers_count: stars } = currentItem;

    if (!language) return total;
    if (!stars) return total;

    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stars };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: (total[language].stars += stars),
      };
    }

    return total;
  }, {});

  const moseUsedLanguages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // Most Stars per language
  const mostStars = moseUsedLanguages
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .slice(0, 5);

  // Stars, Forks
  let { stars, forks } = repos.reduce(
    (total, currentItem) => {
      const { forks, name, stargazers_count } = currentItem;

      total.stars[stargazers_count] = {
        label: name,
        value: stargazers_count,
      };
      total.forks[forks] = { label: name, value: forks };

      return total;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  forks = Object.values(forks)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const chartData = [
    {
      label: "HTML",
      value: "13",
    },
    {
      label: "CSS",
      value: "23",
    },
    {
      label: "JavaScript",
      value: "80",
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={moseUsedLanguages} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStars} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
