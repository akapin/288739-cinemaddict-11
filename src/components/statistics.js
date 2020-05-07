import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUserRank, getDurationHours, getDurationMinutes} from "../utils/common.js";

const BAR_HEIGHT = 50;

const calcGenreStats = (movies) => {
  const genreStats = movies.reduce((acc, obj) => {
    const genres = obj.genres;
    for (const genre of genres) {
      const exist = acc.find(({name}) => genre === name);
      if (exist) {
        exist.count++;
      } else {
        acc.push({
          name: genre,
          count: 1
        });
      }
    }
    return acc;
  }, []);
  return genreStats.slice().sort((a, b) => b.count - a.count);
};

const renderChart = (statisticCtx, movies) => {
  statisticCtx.height = BAR_HEIGHT * 5;
  const genreStats = calcGenreStats(movies);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genreStats.map((genre) => genre.name),
      datasets: [{
        data: genreStats.map((genre) => genre.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = (movies) => {
  const moviesCount = movies.length;
  const userRank = getUserRank(moviesCount);

  const totalDuration = movies.reduce((acc, it) => acc + it.duration, 0);
  const totalDurationHours = getDurationHours(totalDuration);
  const totalDurationMinutes = getDurationMinutes(totalDuration);

  const genreStats = calcGenreStats(movies);
  const topGenre = genreStats.length ? genreStats[0].name : ``;

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${moviesCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDurationHours} <span class="statistic__item-description">h</span> ${totalDurationMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(movies) {
    super();

    this._movies = movies;
    this._chart = null;
    this._renderChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies);
  }

  show() {
    super.show();
    this.rerender(this._movies);
  }

  recoveryListeners() {}

  rerender(movies) {
    this._movies = movies;
    super.rerender();
    this._renderChart();
  }

  _renderChart() {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);
    this._resetChart();
    this._chart = renderChart(statisticCtx, this._movies);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}
