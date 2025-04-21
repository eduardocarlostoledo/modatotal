import React, {
  useEffect,
  useState,
  lazy,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button, Modal, Space, Spin } from "antd";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { NavAdmin } from "./navAdmin";
import { getAdminProducts, banOrUnbanProd } from "../redux/slices/productSlice";
import "../styles/AdminProducts.css";

import { ProductExpandedPanel } from "./ProductExpandedPanel";

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  const {
    allProducts: products = [],
    brands = [],
    types = [],
    loading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const showProductDetails = (product) => {
    Modal.info({
      title: `Detalles de "${product.name}"`,
      width: 400,
      content: (
        <div>
          <p>
            <strong>Marca:</strong> {product.brand}
          </p>
          <p>
            <strong>Precio:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Estado:</strong> {product.status ? "Visible" : "Oculto"}
          </p>
        </div>
      ),
    });
  };

  const handleBanProduct = (product) => {
    Modal.confirm({
      title: `¿Está seguro que desea ${
        product.status ? "ocultar" : "mostrar"
      } este producto?`,
      content: `El producto "${product.name}" será ${
        product.status ? "ocultado" : "mostrado"
      } en la tienda.`,
      okText: "Confirmar",
      cancelText: "Cancelar",
      onOk: () => dispatch(banOrUnbanProd(product.id)),
    });
  };

  const onCancelEdit = () => setEditProduct(null);

  const dataSource = useMemo(
    () => products.map((p) => ({ ...p, key: p.id })),
    [products]
  );

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        width: 70,
        sorter: (a, b) => a.id - b.id,
        align: "center",
      },
      {
        title: "Nombre",
        dataIndex: "name",
        width: 180,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Marca",
        dataIndex: "brand",
        filters: brands.map((b) => ({ text: b.name, value: b.name })),
        onFilter: (value, record) => record.brand === value,
      },
      {
        title: "Precio",
        dataIndex: "price",
        render: (price) => `$${Number(price).toFixed(2)}`,
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: "Estado",
        dataIndex: "status",
        render: (status) => (
          <Tag color={status ? "green" : "red"}>
            {status ? "Visible" : "Oculto"}
          </Tag>
        ),
        filters: [
          { text: "Visible", value: true },
          { text: "Oculto", value: false },
        ],
        onFilter: (value, record) => record.status === value,
        align: "center",
      },
      {
        title: "Acciones",
        render: (_, product) => (
          <Space>
            <Button
              title="Editar"
              icon={<EditOutlined />}
              onClick={() => setEditProduct(product.id)}
            />
            <Button
              title={product.status ? "Ocultar" : "Mostrar"}
              icon={product.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              danger={product.status}
              onClick={() => handleBanProduct(product)}
            />
            <Button
              title="Ver Detalles"
              icon={<InfoCircleOutlined />}
              onClick={() => showProductDetails(product)}
            />
          </Space>
        ),
        align: "center",
      },
    ],
    [brands]
  );

  const expandedRowRender = useCallback(
    (record) => (
      <ProductExpandedPanel
        product={record}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        brands={brands}
        types={types}
        onClose={onCancelEdit}
      />
    ),
    [brands, types, editProduct]
  );

  return (
    <div className="admin-container">
      <NavAdmin handleClick={() => dispatch(getAdminProducts())} />
      <div className="content-container">
        <div
          className="actions-bar"
          style={{ marginBottom: "1rem", textAlign: "right" }}
        >
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(getAdminProducts())}
          >
            Recargar productos
          </Button>
        </div>
        <Table
          className="products-table"
          columns={columns}
          dataSource={dataSource}
          expandable={{
            expandedRowRender,
            rowExpandable: () => true,
          }}
          loading={loading}
          locale={{ emptyText: "No se encontraron productos" }}
          pagination={{
            pageSize: 10,
            pageSizeOptions: ["10", "20", "50"],
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};
