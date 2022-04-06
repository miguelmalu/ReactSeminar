import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import IRating from '../types/Rating';
import RatingService from '../services/RatingService';

function RatingList(): JSX.Element {
    const [ratings, setRatings] = useState<Array<IRating>>([]);
    const [currentRating, setCurrentRating] = useState<IRating | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
      retrieveRatings();
    }, []);

    const retrieveRatings = () => {
        RatingService.getAll()
            .then((response: any) => {
                setRatings(response.data);
                console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    }

    const setActiveRating = (rating: IRating, index: number) => {
        setCurrentRating(rating);
        setCurrentIndex(index);
    };

    return (
        <div className="user">
          <div className="list row">
            <div className="col-md-6">
              <h4>User List</h4>
              <ul className="list-group">
                {ratings &&
                  ratings.map((rating, index) => (
                    <li
                      className={
                        "list-group-item " + (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveRating(rating, index)}
                      key={index}
                    >
                      {rating.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentRating ? (
                <div>
                  <h4>Rating</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentRating.name}
                  </div>
                  <div>
                    <label>
                      <strong>Rating:</strong>
                    </label>{" "}
                    {currentRating.rating}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentRating.description}
                  </div>
                  <Link
                    to={"/edit/" + currentRating.name}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Rating...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    

}

export default RatingList;