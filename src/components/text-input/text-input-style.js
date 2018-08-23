export let input = ({
    width: '100%',
    maxWidth: '20rem',
    borderRadius: '2px',
    border: 'solid 1px #ccc',
    padding: '0.5rem',
    backgroundColor: '#f5f5f5',
    boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.2)',
    fontSize: '1rem',
});

export let container = ({
    width: '100%',
    maxWidth: '20rem',
    display: 'flex',
    alignItems: 'center',
});

export let padding = ({
    ...input,
    paddingLeft: '2em',
});

export let icon = ({
    position: 'absolute',
    width: '1.5rem',
    height: '1.5rem',
    marginLeft: '.25rem',
})