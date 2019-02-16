import React, { Component } from 'react';
import classnames from 'classnames';

import './App.css';

import Api from './api';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '', experts: [], hasNoResults: false };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.value) {
            Api.getExperts(this.state.value).then(experts => {
                this.setState({
                    experts,
                    hasNoResults: experts.length === 0,
                });
            });
        } else {
            this.setState({
                experts: [],
                hasNoResults: false,
            });
        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSubmit} className="form">
                    <label>
                        <input
                            className="input-text"
                            placeholder="Type a skill name. E.g. React"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                </form>

                {this.state.experts.length > 0 && (
                    <ul className="experts">
                        {this.state.experts.map(item => (
                            <li id={item.id}>
                                <figure>
                                    <img alt="" src={item.image} />
                                </figure>
                                <div>
                                    <span>{`${
                                        item.firstName
                                    } ${item.lastName.toUpperCase()}`}</span>
                                    <a href="sip:charie.brown@peanuts.com">
                                        Contact
                                    </a>
                                    <ul className="skills">
                                        {item.skills.map(skill => (
                                            <li
                                                className={classnames({
                                                    predicate: skill
                                                        .toLowerCase()
                                                        .includes(
                                                            this.state.value.toLowerCase()
                                                        ),
                                                })}
                                                key={skill}
                                            >
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {this.state.hasNoResults && this.state.experts.length === 0 && (
                    <p className="no-results">
                        No results. I think only stackoverflow or the official
                        documentation can solve your problem.
                    </p>
                )}
            </div>
        );
    }
}

export default App;
