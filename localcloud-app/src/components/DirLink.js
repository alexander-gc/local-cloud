import { Link } from 'react-router-dom';

export const DirLink = ({ isDirectory, parentDirectory, pathUrl, name, children }) => {


    if (!isDirectory) {
        return <>{children}</>;
    }

    let link;

    pathUrl
        ? link = `${pathUrl}-${name}`
        : link = `/content/${name}`;

    if (parentDirectory) {
        link = link.split('-').slice(0, -2).join('-') || '/content/';
    }

    return (
        <Link to={link} style={{ textDecoration: 'none' }} className="text-light">
            {children}
        </Link>
    );

};