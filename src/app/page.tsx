"use client";

import { useEffect, useState } from "react";
import { Dropdown, Select, TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";

import SkinCard from "./components/SkinsCards";

export default function Home() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("category");
  const [selectedOrdenation, setSelectedOrdenation] = useState("price");
  const [search, setSearch] = useState("");

  const categories = ["category", "name", "price", "float"];
  const ordenations = ["price", "float"];

  useEffect(() => {
    const fetchItems = async () => {
      const query =
        selectedFilter || selectedOrdenation
          ? `?${selectedFilter}=${search}&orderBy=${selectedOrdenation}`
          : "";
      const response = await fetch(`/api/skins${query}`);
      const data = await response.json();
      setSkins(data.items);
    };
    fetchItems();
  }, [search, selectedFilter, selectedOrdenation]);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const response = await fetch("/api/skins");
        const data = await response.json();
        setSkins(data.items);
      } catch (error) {
        console.error("Error fetching skins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkins();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-center items-center ">
      {/* Filtros */}
      <div className="flex gap-4 p-4 rounded-md w-full max-w-3xl mb-8">
        <Select
          value={selectedOrdenation}
          onChange={(ev) => setSelectedOrdenation(ev.target.value)}
          className="flex-1"
        >
          {ordenations.map((ordenation) => (
            <option key={ordenation} value={ordenation}>
              {ordenation}
            </option>
          ))}
        </Select>

        <Select
          value={selectedFilter}
          className="flex-1"
          onChange={(ev) => setSelectedFilter(ev.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <TextInput
          disabled={selectedFilter.length === 0}
          value={search}
          id="search"
          icon={HiOutlineSearch}
          placeholder="Buscar"
          required
          onChange={(ev) => setSearch(ev.target.value)}
          className="flex-1"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl">
        {skins.map((skin: any) => (
          <SkinCard key={skin._id} skin={skin} />
        ))}
      </div>
    </div>
  );
}
