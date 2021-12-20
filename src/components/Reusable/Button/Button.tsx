// React
import React from 'react';

type ButtonProps = {
	buttonMessage: string;
	color?: string;
	width?: string;
	value?: string;
	isDisabled?: boolean;
	buttonAction: (value?: any) => void;
};

function Button(props: ButtonProps): React.ReactElement {
	const { buttonMessage, width, value, isDisabled } = props;

	function handleButtonAction(): void {
		if (value) {
			return props.buttonAction(value);
		}

		return props.buttonAction();
	}

	function handleButtonColor(): string {
		if (isDisabled) {
			return 'bg-grey';
		}

		return props.color ?? 'bg-blue';
	}

	return (
		<button
			type='button'
			className={`font-roboto font-bold p-2 ${width} rounded-lg text-white ${handleButtonColor()} text-center mt-6 m-auto`}
			onClick={() => handleButtonAction()}
			disabled={isDisabled ?? false}
		>
			{buttonMessage}
		</button>
	);
}

export default Button;
