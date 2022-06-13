import { useState } from "react";
const useLoading = (action) => {
	const [loading, setLoading] = useState(false);
	const doAction = (...args) => {
		setLoading(true);
		return action(...args).finally(() => setLoading(false));
	};
	return [doAction, loading];
};
export default useLoading;
