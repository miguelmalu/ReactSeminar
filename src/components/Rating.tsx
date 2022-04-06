import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingService from '../services/RatingService';
import IRating from '../types/Rating';

function Rating(): JSX.Element {

    const { ratingName } = useParams();
    let navigate = useNavigate();

    const initialRatingState = {
        name: "",
        rating: 0,
        description: "",
    };

    const [currentRating, setCurrentRating] = useState<IRating>(initialRatingState);
    const [message, setMessage] = useState<string>("");
    const [rating, setRating] = useState<String>("");

    const getRating = (ratingName: string) => {
        RatingService.get(ratingName)
            .then((response: any) => {
                setCurrentRating(response.data);
                console.log(response.data);
                setRating(ratingName);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (ratingName)
            getRating(ratingName);
    }, [ratingName]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentRating({ ...currentRating, [name]: value });
    };

    const updateRating = () => {
        RatingService.update(rating, currentRating)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The user was updated successfully!");
                setRating(currentRating.name);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteRating = () => {
        RatingService.remove(rating)
            .then((response: any) => {
                console.log(response.data);
                navigate("/");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="rating">
            {currentRating ? (
                <div className="edit-form">
                    <h4>Rating</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="mane">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentRating.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={currentRating.rating}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentRating.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={deleteRating}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateRating}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Rating...</p>
                </div>
            )}
        </div>

    );
}

export default Rating;
