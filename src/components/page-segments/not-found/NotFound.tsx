import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import React from "react";
import { INTERNAL_LINKS } from "../../../helpers/urls";
import { EmptyObject } from "../../../types/empty";

const NotFound: FunctionComponent<EmptyObject> = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push(INTERNAL_LINKS.HOME);
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-white">
			<button
				onClick={handleClick}
				className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200 cursor-pointer italic"
			>
				<span>go home</span>
				<FontAwesomeIcon
					icon={faArrowRight}
					className="transition-transform duration-200 group-hover:translate-x-1"
					style={{ width: "10px", height: "10px" }}
				/>
			</button>
		</div>
	);
};

export default NotFound;
