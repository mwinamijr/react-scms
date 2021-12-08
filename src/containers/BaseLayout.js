import React from "react";

import TopNavbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

const BaseLayout = (props) => {
	return(
		<div className="mt-4">
			<TopNavbar />
			{ props.children }
			<Footer />
		</div>
		)
}

export default BaseLayout;