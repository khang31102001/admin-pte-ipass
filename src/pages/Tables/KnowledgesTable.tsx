import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, { TableColumn } from "../../components/tables/BasicTables/TableComponent";
import Button from "@/components/ui/button/Button";

interface Knowledge {
  knowledge_id: number;
  knowledge_code: string;
  knowledge_name: string;
  level: string;
  mode: string;
  language: string;
  price: string;
}

const columns: TableColumn<Knowledge>[] = [
  { key: "knowledge_id", header: "ID" },
  { key: "knowledge_code", header: "Code" },
  { key: "knowledge_name", header: "Name" },
  { key: "level", header: "Level" },
  { key: "mode", header: "Mode" },
  { key: "language", header: "Language" },
  { key: "price", header: "Price" },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log("Edit", row.knowledge_id)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="warning"
          onClick={() => console.log("Delete", row.knowledge_id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export default function KnowledgesTable() {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);

  useEffect(() => {
    const fetchKnowledges = async () => {
      try {
        // const response = await knowledgeService.getAllKnowledges();
        const response = { items: [
          { knowledge_id: 1, knowledge_code: "K001", knowledge_name: "Knowledge One", level: "Beginner", mode: "Online", language: "English", price: "$100" },
          { knowledge_id: 2, knowledge_code: "K002", knowledge_name: "Knowledge Two", level: "Intermediate", mode: "Offline", language: "Spanish", price: "$200" },
        ]}; // Mocked response for demonstration
        console.log("Knowledges fetched:", response);

        if (response?.items) {
          setKnowledges(response.items);
        } else if (Array.isArray(response)) {
          setKnowledges(response);
        }
      } catch (error) {
        console.error("Error fetching knowledges:", error);
      }
    };

    fetchKnowledges();
  }, []);

  return (
    <>
      <PageMeta
        title="Knowledge Table | TailAdmin"
        description="Knowledge list with dynamic table"
      />
      <PageBreadcrumb pageTitle="Knowledge" />
      <div className="space-y-6">
        <ComponentCard title="Knowledge List">
          <TableComponent columns={columns} data={knowledges} />
        </ComponentCard>
      </div>
    </>
  );
}
