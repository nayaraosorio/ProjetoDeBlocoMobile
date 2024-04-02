import './CompHeader.css'

const CompHeader = () => {
	return (
		<header className="header">
			<div className="left-links">
				{/* <a href="#">
					<img className="logo"
						src="public/imagens/android-chrome-256x256.png"
						width="36"
						height="36"
					/>
				</a> */}
				<a href="#">HOME</a>
				<a href="#">BLOG</a>
				<a href="#">CONTATO</a>
			</div>
			<div className="right-links">
				<a href="#">LOGIN</a>
				<a href="#">CADASTRE-SE</a>
			</div>
		</header>
	);
};

export default CompHeader;
