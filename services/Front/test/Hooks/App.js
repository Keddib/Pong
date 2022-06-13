import { useEffect } from "react";
import { render } from "react-dom"
import useLoading from "./useLoading";

function Home() {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const fetchDevs = async () => {
		console.log("this might take some time....");
		await delay(4000);
		console.log("Done!");
	};
	const fetchStacks = async () => {
		console.log("this might take some time....");
		await delay(5000);
		console.log("Done!");
	};
	const [getDev, isLoadingDev] = useLoading(fetchDevs);
	const [getStacks, isLoadingStack] = useLoading(fetchStacks);
	useEffect(() => {
		getDev();
		getStacks();
	}, []);
	return (
		<div className="app
         container
         d-flex
         flex-column
         justify-content-center
         align-items-center"
		>
			<article className="d-flex flex-column my-2">
				<p className="text-center">Welcome to Dev Hub</p>
			</article>
			<article className="d-flex flex-column">
				<button className="m-2 p-3 btn btn-success btn-sm">
					{isLoadingDev ? "Loading Devs..." : `View Devs`}
				</button>
				<button className="m-2 p-3 btn btn-success btn-sm">
					{isLoadingStack ? "Loading Stacks..." : "View Stacks"}
				</button>
			</article>
		</div>
	);
}

render(<Home />, document.getElementById("root"));
