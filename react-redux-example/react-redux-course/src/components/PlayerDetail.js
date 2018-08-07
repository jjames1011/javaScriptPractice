import React, { PropTypes } from 'react';

const PlayerDetail = (props) => {
  if(props.selectedPlayer){

    return (
      <div>
        <h3>{props.selectedPlayer.name}</h3>
        <ul>
          <li>
            <span>Score: </span>
            {props.selectedPlayer.score}
          </li>
          <li>
            <span>Created: </span>
            {props.selectedPlayer.created}
          </li>
          <li>
            <span>Updated: </span>
            {props.selectedPlayer.updated }
          </li>
        </ul>
      </div>
    );
  }
  else {
    return (<p>Click on a player to see more details</p>);
  }
};

PlayerDetail.propTypes = {
  selectedPlayer: PropTypes.object,
}

export default PlayerDetail;
