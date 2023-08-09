import { Button, FormControl } from "react-bootstrap";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl
                id="search"
                type="text"
                placeholder="Filter table by name..."
                value={filterText}
                onChange={onFilter}
                style={{ marginRight: '10px' }}
            />
            <Button variant="primary" onClick={onClear}>Clear</Button>
        </div>
    </>
);

export default FilterComponent;