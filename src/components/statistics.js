import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUserRank, getDurationHours, getDurationMinutes} from "../utils/common.js";
import {DatePeriod} from "../const.js";
import moment from "moment";

const BAR_HEIGHT = 50;

const getMoviesByWatchingDate = (movies, dateFrom) => {
  if (!dateFrom) {
    return movies;
  }
  return movies.filter((movie) => movie.watchingDate >= dateFrom);
};

const calcGenreStats = (movies) => {
  const genreStats = movies.reduce((acc, movie) => {
    const genres = movie.genres;
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
        anchor: `start`,
        barThickness: 24
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

const createStatisticsTemplate = (movies, datePeriod, userRank) => {
  const moviesCount = movies.length;

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

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${datePeriod === DatePeriod.ALL ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${datePeriod === DatePeriod.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${datePeriod === DatePeriod.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${datePeriod === DatePeriod.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${datePeriod === DatePeriod.YEAR ? `checked` : ``}>
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

    this._allMovies = movies;
    this._filteredMovies = this._allMovies;
    this._userRank = getUserRank(this._allMovies.length);
    this._currentDatePeriod = DatePeriod.ALL;

    this._chart = null;
    this._renderChart(this._filteredMovies);

    this.datePeriodChangeHandler = null;
    this._onDatePeriodChange = this._onDatePeriodChange.bind(this);
    this.setDatePeriodChangeHandler(this._onDatePeriodChange);
  }

  getTemplate() {
    return createStatisticsTemplate(this._filteredMovies, this._currentDatePeriod, this._userRank);
  }

  show() {
    super.show();
    this.rerender();
  }

  recoveryListeners() {
    this.setDatePeriodChangeHandler(this.datePeriodChangeHandler);
  }

  rerender() {
    super.rerender();
    this._renderChart(this._filteredMovies);
  }

  setDatePeriodChangeHandler(handler) {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      handler(evt.target.value);
    });

    this.datePeriodChangeHandler = handler;
  }

  _onDatePeriodChange(period) {
    this._currentDatePeriod = period;
    let dateFrom = null;

    switch (period) {
      case `today`:
        dateFrom = moment().startOf(`day`).toDate();
        break;
      case `week`:
        dateFrom = moment().startOf(`isoWeek`).toDate();
        break;
      case `month`:
        dateFrom = moment().startOf(`month`).toDate();
        break;
      case `year`:
        dateFrom = moment().startOf(`year`).toDate();
        break;
      default:
        dateFrom = null;
        break;
    }

    this._filteredMovies = getMoviesByWatchingDate(this._allMovies, dateFrom);
    this.rerender();
  }

  _renderChart(movies) {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);
    this._resetChart();
    this._chart = renderChart(statisticCtx, movies);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}
