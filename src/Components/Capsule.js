import React from 'react';
import './Capsule.css';

const Capsule = (props) => {
	let active = props.ext === props.active ? ' active' : '';
	return (
		<div className={"capsule" + active} onClick={props.onCapsuleClick}>
			index.{props.ext}
		</div>
	);
}

export default Capsule;