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

export const ProductExpandedPanel = React.memo(
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