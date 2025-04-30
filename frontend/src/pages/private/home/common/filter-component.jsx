import React from "react";
import { Button, Form, Input } from "antd";
import { Search } from "lucide-react";
function FilterComponent({ filters, setFilters, onFilters }) {
  return (
    <Form layout="vertical" className="grid grid-cols-3 gap-5 items-end">
      <Form.Item label="Name">
        <Input
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
          placeholder="Event name"
        />
      </Form.Item>

      <Form.Item label="Date">
        <Input
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          type="date"
        />
      </Form.Item>

      <Form.Item>
        <div className="flex gap-5">
          <Button
            onClick={() => {
                setFilters({ searchText: "", date: "" })
                onFilters({ searchText: "", date: "" })
            }}
          >
            Clear Search
          </Button>
          <Button
            type="primary"
            disabled={!filters.searchText && !filters.date}
            onClick={()=> onFilters(filters)}
          >
            Apply Search
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default FilterComponent;
