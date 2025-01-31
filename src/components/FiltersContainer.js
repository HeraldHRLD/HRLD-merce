import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleFilterClick } from '../actions';

import { FaTimes } from 'react-icons/fa';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/slider';

//SLIDER STYLES
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const CustomSlider = withStyles({
  root: {
    color: '#2a2b2c',
  },
})(Slider);

import '../styles/components/FiltersContainer.scss';

const FiltersContainer = ({
  products,
  filterClick,
  handleFilterClick,
  admin = false,
}) => {
  const path = useLocation().pathname.toLowerCase();
  const classes = useStyles();
  const [priceValues, setPriceValues] = useState([0, 18000]);
  const activeFilterClick = () => {
    handleFilterClick(!filterClick);
  };

  const handleChange = (event, newValue) => {
    setPriceValues(newValue);
  };

  //Category map
  const categories = [];
  for (let i = 0; i < products.length; i++) {
    const category = products[i].category;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  }

  //Colors map
  const colors = [];
  for (let i = 0; i < products.length; i++) {
    const category = products[i].color;
    if (!colors.includes(category)) {
      colors.push(category);
    }
  }
  return (
    <div
      className={
        filterClick ? 'side-filters_wrapper active' : 'side-filters_wrapper'
      }
    >
      <div className="side-filters_container">
        <header>
          <a
            title="Close"
            className="close-icon_container"
            onClick={activeFilterClick}
          >
            <FaTimes className="icon" />
          </a>
        </header>
        <div className="filters-container">
          <div className="price-filter">
            <div>
              <h3>Filtro de precio</h3>
            </div>
            <div className={classes.root}>
              <CustomSlider
                value={priceValues}
                onChange={handleChange}
                max={18000}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => priceValues}
              />
            </div>
            <div>
              <Link
                to={
                  admin
                    ? `/admin/profile?minPrice=${priceValues[0]}&maxPrice=${priceValues[1]}`
                    : `/products?minPrice=${priceValues[0]}&maxPrice=${priceValues[1]}`
                }
              >
                <h4>filtrar por precio</h4>
              </Link>
            </div>
          </div>
          <div className="category-filter">
            <div>
              <h3>Filtra por categoría</h3>
            </div>
            <ul className="categories-container">
              {categories.map((categorie, index) => {
                return (
                  <li onClick={activeFilterClick} key={index}>
                    <Link
                      to={
                        admin
                          ? `${path}?${`category=${categorie.toLowerCase()}`}`
                          : `${path}?${`category=${categorie.toLowerCase()}`}`
                      }
                    >
                      {categorie}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="color-fllter">
            <div>
              <h3>Filtra por color</h3>
            </div>
            <div>
              <ul className="colors-container">
                {colors.map((color) => (
                  <li key={color}>
                    <Link to={`${path}?color=${color}`}>{color}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterClick: state.filterClick,
    products: state.products,
  };
};

const mapDispatchToProps = {
  handleFilterClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
