import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Form = ({ className }) => {
	return (
		<form className={className}>
			<Input id="username" type="text" dark={true} />
			<Input id="password" type="password" dark={true} />
			<Button text="sign in" className="bg-spaceCadet text-lotion hover:bg-pictonBlue" />
		</form>
	);
}

export default Form;
