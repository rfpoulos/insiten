import caret from '../../images/caret-down-solid.svg';

export let container = ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export let select = ({
    width: '6rem',
    border: '0', 
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    background: `url(${caret}) no-repeat center right`,
    backgroundSize: '1.5rem 1.5rem',
    borderRadius: '2px',
    backgroundColor: 'rgb(245, 245, 245)',
    fontSize: '1rem',
    padding:'.25rem',
})
