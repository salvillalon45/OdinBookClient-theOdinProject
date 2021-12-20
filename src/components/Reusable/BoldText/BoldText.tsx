// React
import React from 'react';

type BoldTextProps = {
	text: string;
	greyFlag?: string;
};

function BoldText({ text, greyFlag }: BoldTextProps): React.ReactElement {
	const color = greyFlag ?? '';
	return <p className={`${color} pl-2 font-medium text-lg`}>{text}</p>;
}

export default BoldText;
