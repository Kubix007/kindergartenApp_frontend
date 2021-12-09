import React from 'react'

const SvgConverter = ({ src, ...props }) => {

    return (
        <div dangerouslySetInnerHTML={{ __html: src }} {...props}></div>
    );
}

export default SvgConverter;