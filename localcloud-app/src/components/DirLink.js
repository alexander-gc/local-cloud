import { Link } from 'react-router-dom';

export const DirLink = ({ isDirectory, parentDirectory, pathUrl, name, children }) => {

    if (!isDirectory) {
        return <>{children}</>;
    }

    let link = `/content/${name}`;
    if (pathUrl) {
        link = `${pathUrl}-${name}`;
    }
    if (parentDirectory) {
        link = link.split('-').slice(0, -1).join('-') || '/content/';
    }

    return (
        <Link to={link} style={{ textDecoration: 'none' }} className="text-light">
            {children}
        </Link>
    );

};