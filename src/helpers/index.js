const scrollInto = (elementId) => {
    const section = document.querySelector(`#${elementId}`);
    let coords = section.getBoundingClientRect();
    section.scrollIntoView({ block: 'center',  behavior: 'smooth' });

    console.log(coords)
    return coords.top
    // section.scrollIntoView({ behavior: 'smooth' });
}

export {
    scrollInto
}
