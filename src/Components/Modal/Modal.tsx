import React, { FC } from "react";
import "./Modal.css";
interface LayoutProps {
	children: React.ReactNode;
	closeModal: any;
}
const Modal: FC<LayoutProps> = ({ children, closeModal }) => {
	return (
		<div className="Modal-Area">
			<div className="Modal-content">
				<div className="Modal-header">
					<button className="close-modal" onClick={closeModal}>
						&times;
					</button>
				</div>
				<div className="modal-body">{children}</div>
			</div>
		</div>
	);
};
export default Modal;
