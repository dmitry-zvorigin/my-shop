import { createPortal } from 'react-dom';

export default function ImageViewerPortal({ children }) {
    return createPortal(children, document.body);
}