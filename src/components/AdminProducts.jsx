import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Input,
  Select,
  Button,
  Modal,
  Form,
  Upload,
  message,
  Space,
  Divider,
  Spin,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  CloseOutlined,
  SaveOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { NavAdmin } from "./navAdmin";
import {
  getAdminProducts,
  updateProduct,
  banOrUnbanProd,
} from "../redux/slices/productSlice";
import { update } from "../redux/slices/cartSlice";
import "../styles/AdminProducts.css";

const { Option } = Select;
const { TextArea } = Input;

const ProductExpandedPanel = React.memo(
  ({ product, editProduct, setEditProduct, brands, types, onClose }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(product.image);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Inicializar formulario con valores del producto
    useEffect(() => {
      if (product && editProduct === product.id) {
        form.setFieldsValue({
          ...product,
          image: undefined, // Resetear campo de imagen
        });
        setImagePreview(product.image);
      }
    }, [product, form, editProduct]);

    const handleSubmit = async (values) => {
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);
        setLoading(true);

        // Validar que tenemos un ID de producto válido
        if (!product?.id) {
          throw new Error("ID de producto inválido");
        }

        const formData = new FormData();
        formData.append("id", product.id);

        Object.entries(values).forEach(([key, value]) => {
          if (key === "image" && value?.file) {
            formData.append(key, value.file);
          } else if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        await dispatch(
          updateProduct({
            id: product.id,
            data: formData,
          })
        );

        message.success(`Producto "${product.name}" actualizado exitosamente`);
        onClose(); // Cerrar el panel después de actualizar
        dispatch(update(true));
      } catch (error) {
        console.error("Error al actualizar producto:", error);
        message.error(error.message || "Error al actualizar el producto");
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    };

    const beforeUpload = (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Solo puedes subir archivos de imagen!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("La imagen debe ser menor a 2MB!");
        return Upload.LIST_IGNORE;
      }
      return true;
    };

    const uploadProps = {
      beforeUpload,
      onChange: (info) => {
        if (info.file.status === "done") {
          setImagePreview(URL.createObjectURL(info.file.originFileObj));
        }
      },
      showUploadList: false,
      maxCount: 1,
      accept: "image/*",
    };

    return (
      <div className="product-expanded-panel">
        <div className="panel-header">
          <h3>Editar Producto: {product.name}</h3>
          <Button
            icon={<CloseOutlined />}
            type="text"
            onClick={onClose}
            className="close-edit-btn"
          />
                            <Button onClick={onClose}>Cancelar</Button> {/* Usar onClose aquí también */}
        </div>

        <Spin
          spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={product}
          >
            <div className="form-grid-container">
              <div className="form-image-section">
                <Form.Item
                  name="image"
                  label="Imagen del producto"
                  valuePropName="file"
                  getValueFromEvent={(e) => e?.fileList?.[0]}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Cambiar imagen</Button>
                  </Upload>
                </Form.Item>
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                    onError={(e) => {
                      e.target.src = "/placeholder-product.png";
                    }}
                  />
                </div>
              </div>

              <div className="form-details-section">
                <Form.Item
                  name="name"
                  label="Nombre"
                  rules={[{ required: true, message: "Ingrese el nombre" }]}
                >
                  <Input placeholder="Nombre del producto" />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Precio"
                  rules={[
                    { required: true, message: "Ingrese el precio" },
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: "Precio inválido",
                    },
                  ]}
                >
                  <Input type="number" min={0} step={0.01} prefix="$" />
                </Form.Item>

                <Form.Item
                  name="stock"
                  label="Stock"
                  rules={[
                    { required: true, message: "Ingrese el stock" },
                    {
                      pattern: /^\d+$/,
                      message: "Stock debe ser un número entero",
                    },
                  ]}
                >
                  <Input type="number" min={0} />
                </Form.Item>

                <Form.Item
                  name="brand"
                  label="Marca"
                  rules={[{ required: true, message: "Seleccione la marca" }]}
                >
                  <Select
                    showSearch
                    placeholder="Seleccione marca"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {brands?.map((brand) => (
                      <Option key={brand.id} value={brand.name}>
                        {brand.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="type"
                  label="Tipo"
                  rules={[{ required: true, message: "Seleccione el tipo" }]}
                >
                  <Select
                    showSearch
                    placeholder="Seleccione tipo"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {types?.map((type) => (
                      <Option key={type.id} value={type.name}>
                        {type.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.type !== currentValues.type
                  }
                >
                  {({ getFieldValue }) =>
                    (getFieldValue("type") === "Motherboard" ||
                      getFieldValue("type") === "processor") && (
                      <Form.Item
                        name="info_adicional"
                        label="Socket"
                        rules={[
                          { required: true, message: "Ingrese el socket" },
                        ]}
                      >
                        <Input placeholder="Tipo de socket" />
                      </Form.Item>
                    )
                  }
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Descripción"
                  rules={[
                    { required: true, message: "Ingrese la descripción" },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Descripción detallada del producto"
                  />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={isSubmitting}
                      disabled={!product?.id || isSubmitting}
                    >
                      Guardar cambios
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                  </Space>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Spin>
      </div>
    );
  }
);

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  const {
    allProducts: products,
    brands,
    types,
    loading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const showProductDetails = (product) => {
    Modal.info({
      title: "Detalles del Producto",
      content: (
        <div>
          <p>Nombre: {product.name}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ),
    });
  };

  const handleBanProduct = (product) => {
    Modal.confirm({
      title: `¿Está seguro que desea ${
        product.status ? "ocultar" : "mostrar"
      } este producto?`,
      content: `El producto ${product.name} será ${
        product.status ? "ocultado" : "mostrado"
      } en la tienda.`,
      okText: "Confirmar",
      cancelText: "Cancelar",
      onOk: () => dispatch(banOrUnbanProd(product.id)),
    });
  };

  const onCancelEdit = () => {
    setEditProduct(null);
  };
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      filters:
        brands?.map((brand) => ({
          text: brand.name,
          value: brand.name,
        })) || [],
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
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
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => setEditProduct(record.id)}
          />
          <Button
            icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => handleBanProduct(record)}
            danger={record.status}
          />

          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => showProductDetails(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-container">
      <NavAdmin />

      <div className="content-container">
        <Table
          className="products-table"
          columns={columns}
          dataSource={products?.map((p) => ({ ...p, key: p.id })) || []}
          expandable={{
            expandedRowRender: (record) => (
              <ProductExpandedPanel
                product={record}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                brands={brands}
                types={types}
                onClose={onCancelEdit} // Pasar la función para cerrar
              />
            ),
            rowExpandable: (record) => true,
          }}
          loading={!products}
          locale={{
            emptyText: "No se encontraron productos",
          }}
        />
      </div>
    </div>
  );
};

/* {

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Input, Select, Button, Modal, Form, Upload, message, Space, Divider } from "antd";
import { 
  UploadOutlined, 
  EditOutlined, 
  EyeInvisibleOutlined, 
  EyeOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { NavAdmin } from "./navAdmin";
import {
  getAdminProducts,
  getAllProductsNameForAdmin,
  getAllBrands,
  getAllTypes,
  updateProduct,
  banOrUnbanProd,
} from "../redux/slices/productSlice";
import { update } from "../redux/slices/cartSlice";

const { Option } = Select;
const { TextArea } = Input;

const ProductExpandedPanel = ({
  product,
  editProduct,
  setEditProduct,
  brands,
  types
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(product.image);

  useEffect(() => {
    form.setFieldsValue({
      ...product,
      image: undefined // Resetear campo de imagen
    });
    setImagePreview(product.image);
  }, [product, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (key === 'image' && values[key]) {
          formData.append(key, values[key].file);
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      await dispatch(updateProduct(product.id, formData));
      message.success("Producto actualizado exitosamente");
      setEditProduct(null);
      dispatch(update(true));
    } catch (error) {
      message.error("Error al actualizar el producto");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Solo puedes subir archivos de imagen!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('La imagen debe ser menor a 2MB!');
    }
    return isImage && isLt2M;
  };

  const uploadProps = {
    beforeUpload,
    onChange: (info) => {
      if (info.file.status === 'done') {
        setImagePreview(URL.createObjectURL(info.file.originFileObj));
      }
    },
    showUploadList: false,
    maxCount: 1
  };

  return (
    <div className="product-expanded-panel">
      {editProduct !== product.id ? (
        <div className="product-view-mode">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h3>{product.name}</h3>
            <div className="product-meta">
              <Tag color="blue">{product.brand}</Tag>
              <Tag color="geekblue">{product.type}</Tag>
              <Tag color="gold">${product.price}</Tag>
              <Tag color={product.stock > 0 ? "green" : "red"}>
                Stock: {product.stock}
              </Tag>
            </div>
            <Divider />
            <p><strong>Descripción:</strong> {product.description}</p>
            {product.info_adicional && (
              <p><strong>Info adicional:</strong> {product.info_adicional}</p>
            )}
          </div>
        </div>
      ) : (
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="product-edit-form"
        >
          <CloseOutlined 
            className="close-edit-btn"
            onClick={() => setEditProduct(null)}
          />

          <div className="form-grid-container">
            <div className="form-image-section">
              <Form.Item
                name="image"
                label="Imagen del producto"
                valuePropName="file"
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Cambiar imagen</Button>
                </Upload>
              </Form.Item>
              <div className="image-preview-container">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="image-preview"
                />
              </div>
            </div>

            <div className="form-details-section">
              <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: 'Ingrese el nombre' }]}
              >
                <Input placeholder="Nombre del producto" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Precio"
                rules={[{ required: true, message: 'Ingrese el precio' }]}
              >
                <Input type="number" min={0} step={0.01} prefix="$" />
              </Form.Item>

              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: 'Ingrese el stock' }]}
              >
                <Input type="number" min={0} />
              </Form.Item>

              <Form.Item
                name="brand"
                label="Marca"
                rules={[{ required: true, message: 'Seleccione la marca' }]}
              >
                <Select
                  showSearch
                  placeholder="Seleccione marca"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {brands.map(brand => (
                    <Option key={brand.id} value={brand.name}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="type"
                label="Tipo"
                rules={[{ required: true, message: 'Seleccione el tipo' }]}
              >
                <Select
                  showSearch
                  placeholder="Seleccione tipo"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {types.map(type => (
                    <Option key={type.id} value={type.name}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {(form.getFieldValue('type') === "Motherboard" || 
                form.getFieldValue('type') === "processor") && (
                <Form.Item
                  name="info_adicional"
                  label="Socket"
                >
                  <Input placeholder="Tipo de socket" />
                </Form.Item>
              )}

              <Form.Item
                name="description"
                label="Descripción"
                rules={[{ required: true, message: 'Ingrese la descripción' }]}
              >
                <TextArea rows={4} placeholder="Descripción detallada del producto" />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Guardar cambios
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const change = useSelector(state => state.update);

  const { allProducts: products, brands, types } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllBrands());
    dispatch(getAllTypes());
    dispatch(update(false));
  }, [dispatch, change]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      dispatch(getAllProductsNameForAdmin(searchTerm));
    }
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    dispatch(getAdminProducts());
  };

  const handleBanProduct = (product) => {
    Modal.confirm({
      title: `¿Está seguro que desea ${product.status ? 'ocultar' : 'mostrar'} este producto?`,
      content: `El producto ${product.name} será ${product.status ? 'ocultado' : 'mostrado'} en la tienda.`,
      okText: 'Confirmar',
      cancelText: 'Cancelar',
      onOk: () => dispatch(banOrUnbanProd(product.id))
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: 80
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="product-name">{text}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
      filters: brands.map(brand => ({
        text: brand.name,
        value: brand.name
      })),
      onFilter: (value, record) => record.brand === value,
      filterSearch: true
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      filters: types.map(type => ({
        text: type.name,
        value: type.name
      })),
      onFilter: (value, record) => record.type === value,
      filterSearch: true
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>
          {stock}
        </Tag>
      ),
      sorter: (a, b) => a.stock - b.stock
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Visible' : 'Oculto'}
        </Tag>
      ),
      filters: [
        { text: 'Visible', value: true },
        { text: 'Oculto', value: false }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => setEditProduct(record.id)}
            title="Editar"
          />
          <Button 
            type="text" 
            icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => handleBanProduct(record)}
            title={record.status ? 'Ocultar' : 'Mostrar'}
            danger={record.status}
          />
        </Space>
      )
    }
  ];

  return (
    <div className="admin-products-container">
      <NavAdmin />
      
      <div className="products-content">
        <div className="search-bar">
          <Input.Search
            placeholder="Buscar productos..."
            enterButton="Buscar"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            style={{ width: '50%' }}
          />
          {isSearching && (
            <Button 
              type="link" 
              onClick={handleResetSearch}
              style={{ marginLeft: 8 }}
            >
              Mostrar todos
            </Button>
          )}
        </div>

        <Table
          className="products-table"
          columns={columns}
          dataSource={products?.map(p => ({ ...p, key: p.id })) || []}
          expandable={{
            expandedRowRender: (record) => (
              <ProductExpandedPanel
                product={record}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                brands={brands}
                types={types}
              />
            ),
            rowExpandable: (record) => true
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total: ${total} productos`
          }}
          scroll={{ x: true }}
          loading={!products}
          locale={{
            emptyText: 'No se encontraron productos'
          }}
        />
      </div>
    </div>
  );
}

*/
