import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from 'react-md';

export const states =  [{
  name: 'Alabama',
  abbreviation: 'AL',
}, {
  name: 'Alaska',
  abbreviation: 'AK',
}, {
  name: 'American Samoa',
  abbreviation: 'AS',
}, {
  name: 'Arizona',
  abbreviation: 'AZ',
}, {
  name: 'Arkansas',
  abbreviation: 'AR',
}, {
  name: 'California',
  abbreviation: 'CA',
}, {
  name: 'Colorado',
  abbreviation: 'CO',
}, {
  name: 'Connecticut',
  abbreviation: 'CT',
}, {
  name: 'Delaware',
  abbreviation: 'DE',
}, {
  name: 'District Of Columbia',
  abbreviation: 'DC',
}, {
  name: 'Federated States Of Micronesia',
  abbreviation: 'FM',
}, {
  name: 'Florida',
  abbreviation: 'FL',
}, {
  name: 'Georgia',
  abbreviation: 'GA',
}, {
  name: 'Guam',
  abbreviation: 'GU',
}, {
  name: 'Hawaii',
  abbreviation: 'HI',
}, {
  name: 'Idaho',
  abbreviation: 'ID',
}, {
  name: 'Illinois',
  abbreviation: 'IL',
}, {
  name: 'Indiana',
  abbreviation: 'IN',
}, {
  name: 'Iowa',
  abbreviation: 'IA',
}, {
  name: 'Kansas',
  abbreviation: 'KS',
}, {
  name: 'Kentucky',
  abbreviation: 'KY',
}, {
  name: 'Louisiana',
  abbreviation: 'LA',
}, {
  name: 'Maine',
  abbreviation: 'ME',
}, {
  name: 'Marshall Islands',
  abbreviation: 'MH',
}, {
  name: 'Maryland',
  abbreviation: 'MD',
}, {
  name: 'Massachusetts',
  abbreviation: 'MA',
}, {
  name: 'Michigan',
  abbreviation: 'MI',
}, {
  name: 'Minnesota',
  abbreviation: 'MN',
}, {
  name: 'Mississippi',
  abbreviation: 'MS',
}, {
  name: 'Missouri',
  abbreviation: 'MO',
}, {
  name: 'Montana',
  abbreviation: 'MT',
}, {
  name: 'Nebraska',
  abbreviation: 'NE',
}, {
  name: 'Nevada',
  abbreviation: 'NV',
}, {
  name: 'New Hampshire',
  abbreviation: 'NH',
}, {
  name: 'New Jersey',
  abbreviation: 'NJ',
}, {
  name: 'New Mexico',
  abbreviation: 'NM',
}, {
  name: 'New York',
  abbreviation: 'NY',
}, {
  name: 'North Carolina',
  abbreviation: 'NC',
}, {
  name: 'North Dakota',
  abbreviation: 'ND',
}, {
  name: 'Northern Mariana Islands',
  abbreviation: 'MP',
}, {
  name: 'Ohio',
  abbreviation: 'OH',
}, {
  name: 'Oklahoma',
  abbreviation: 'OK',
}, {
  name: 'Oregon',
  abbreviation: 'OR',
}, {
  name: 'Palau',
  abbreviation: 'PW',
}, {
  name: 'Pennsylvania',
  abbreviation: 'PA',
}, {
  name: 'Puerto Rico',
  abbreviation: 'PR',
}, {
  name: 'Rhode Island',
  abbreviation: 'RI',
}, {
  name: 'South Carolina',
  abbreviation: 'SC',
}, {
  name: 'South Dakota',
  abbreviation: 'SD',
}, {
  name: 'Tennessee',
  abbreviation: 'TN',
}, {
  name: 'Texas',
  abbreviation: 'TX',
}, {
  name: 'Utah',
  abbreviation: 'UT',
}, {
  name: 'Vermont',
  abbreviation: 'VT',
}, {
  name: 'Virgin Islands',
  abbreviation: 'VI',
}, {
  name: 'Virginia',
  abbreviation: 'VA',
}, {
  name: 'Washington',
  abbreviation: 'WA',
}, {
  name: 'West Virginia',
  abbreviation: 'WV',
}, {
  name: 'Wisconsin',
  abbreviation: 'WI',
}, {
  name: 'Wyoming',
  abbreviation: 'WY',
}];

const data = states.map(({ name }) => name);

export default class Search extends PureComponent {
  static propTypes = {
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onAutocomplete: PropTypes.func,
    value: PropTypes.string,
  };

  state = { filteredData: [] };

  /**
   * This custom filter will take the current value and return all matches that start
   * with the value ignoring case and then bold the letters in the search results that
   * match.
   */
  filter = (value) => {
    const r = new RegExp(`^${value}`, 'i');
    const l = value.length;
    const filteredData = data.reduce((matches, state) => {
      if (r.test(state)) {
        matches.push({
          label: [
            <span key="bold" className="md-font-bold">{state.substring(0, l)}</span>,
            state.substring(l),
          ],
          value: state,
        });
      }

      return matches;
    }, []);

    this.setState({ filteredData });
  };

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.filter(value);
  };

  handleAutocomplete = (value) => {
    if (this.props.onAutocomplete) {
      this.props.onAutocomplete(value);
    }

    this.filter(value);
  };

  render() {
    const { filteredData } = this.state;
    return (
      <Autocomplete
        {...this.props}
        id="toolbar-search"
        className="toolbar-search"
        type="search"
        data={filteredData}
        placeholder="Search"
        customSize="search"
        filter={null}
        onChange={this.handleChange}
        onAutocomplete={this.handleAutocomplete}
        block
        dataLabel="label"
        dataValue="value"
        listClassName="toolbar-search__list"
      />
    );
  }
}