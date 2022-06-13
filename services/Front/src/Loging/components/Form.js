import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Form = ({ className }) => {
	return (
		<form className={className}>
			<Input id="username" type="text" dark={true} />
			<Input id="password" type="password" dark={true} />
			<Button text="sign in" className="bg-pictonBlue text-lotion hover:bg-spaceCadet hover:border-spaceCadet border-2 border-pictonBlue" />
			<p className="mt-4 cursor-pointer text-spaceCadet/70 hover:text-spaceCadet">Did you forget your password?</p>
		</form>
	);
}

export default Form;
