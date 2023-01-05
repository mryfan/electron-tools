import type { DataTableColumns } from "naive-ui";
import { NTag, NButton } from "naive-ui";
import { h } from "vue";

type RowData = {
  name: string;
  remark: string;
  project_status: string;
  run_status: string;
};

const createColumns = ({
  sendMail,
}: {
  sendMail: (rowData: RowData) => void;
}): DataTableColumns<RowData> => {
  return [
    {
      type: "selection",
    },
    {
      type: "expand",
      expandable: (rowData) => rowData.name !== "Jim Green",
      renderExpand: (rowData) => {
        return `${rowData.name} is a good guy.`;
      },
    },
    {
      title: "序号",
      key: "serial_number",
      render: (_, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: "项目名称",
      key: "name",
    },
    {
      title: "项目备注",
      key: "remark",
    },
    {
      title: "项目状态",
      key: "project_status",
      render(row: RowData) {
        return h(
          NTag,
          {
            style: {
              marginRight: "6px",
            },
            type: "info",
            bordered: false,
          },
          {
            default: () => row.project_status,
          }
        );
      },
    },
    {
      title: "运行状态",
      key: "run_status",
      render(row: RowData) {
        return h(
          NTag,
          {
            style: {
              marginRight: "6px",
            },
            type: "info",
            bordered: false,
          },
          {
            default: () => row.run_status,
          }
        );
      },
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => sendMail(row),
          },
          { default: () => "创建容器" }
        );
      },
    },
  ];
};

const createData = async (): Promise<RowData[]> => {
  const project_info: RowData[] = await window.el_store.get("project_info");
  console.log(project_info);
  return project_info;
};

export { createColumns, createData, type RowData };
