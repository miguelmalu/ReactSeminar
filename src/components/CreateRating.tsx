import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingService from '../services/RatingService';
import IRating from '../types/Rating';

function CreateRating(): JSX.Element {

    const initialRatingState = {
        name: "",
        rating: 0,
        description: ""
    };
    const [rating, setRating] = useState<IRating>(initialRatingState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRating({ ...rating, [name]: value });
    };

    const saveRating = () => {
        var data = {
            name: rating.name,
            rating: rating.rating,
            description: rating.description
        };
        console.log(data);
        RatingService.create(data)
            .then((response: any) => {
                setRating({
                    name: response.data.name,
                    description: response.data.descritpion,
                    rating: response.data.rating
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const newRating = () => {
        setRating(initialRatingState);
        setSubmitted(false);
    };

    return (
        <div className="rating">
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newRating}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={rating.name}
                                onChange={handleInputChange}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rating"
                                required
                                value={rating.rating}
                                onChange={handleInputChange}
                                name="rating"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={rating.description}
                                onChange={handleInputChange}
                                name="description"
                            />
                        </div>
                        <button onClick={saveRating} className="btn btn-success">
                            Submit
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateRating;
