import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Button,
  Select,
  Form,
  Modal,
  Descriptions,
  Input,
  message,
  Space
} from "antd";
import { AiFillEdit } from "react-icons/ai";
import { addAllOrders, updateOrderStatus } from "../redux/slices/orderSlice";
import { NavAdmin } from "./navAdmin";

const { Option } = Select;

export const AdminOrder = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(addAllOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.AllOrders || []);

  const handleStatusChange = async (orderId, updatedFields) => {
    try {
      await dispatch(updateOrderStatus({ orderId, body: updatedFields }));
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      return false;
    }
  };

  const showEditModal = (record) => {
    setEditingOrder(record);
    
    const buyerAddress = typeof record.buyer_address === 'string' 
      ? JSON.parse(record.buyer_address) 
      : record.buyer_address || {};
    
    form.setFieldsValue({
      status: record.status,
      estadoEnvio: record.estadoEnvio,
      payment_type: record.payment_type,
      buyer_state: buyerAddress.state || "",
      buyer_address: buyerAddress.address || "",
      buyer_country: buyerAddress.country || "",
      buyer_city: buyerAddress.city || "",
      buyer_phone: record.buyer_phone,
      trackSeguimiento: record.trackSeguimiento,
      trackUrl: record.trackUrl,
      trackCarrierName: record.trackCarrierName,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      
      const updatedFields = {
        status: values.status,
        estadoEnvio: values.estadoEnvio,
        payment_type: values.payment_type,
        buyer_address: {
          state: values.buyer_state,
          address: values.buyer_address,
          country: values.buyer_country,
          city: values.buyer_city,
        },
        buyer_phone: values.buyer_phone,
        trackSeguimiento: values.trackSeguimiento,
        trackUrl: values.trackUrl,
        trackCarrierName: values.trackCarrierName,
      };
      
      const success = await handleStatusChange(editingOrder.id, updatedFields);
      
      if (success) {
        message.success('Orden actualizada correctamente');
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error('Error al actualizar la orden');
      }
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      message.error('Por favor complete todos los campos requeridos');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Cliente",
      render: (_, record) => {
        const buyerAddress = typeof record.buyer_address === "string"
          ? JSON.parse(record.buyer_address)
          : record.buyer_address || {};

        return (
          <div>
            <div><strong>{record.buyer_email}</strong></div>
            <div>{record.buyer_name} {record.buyer_lastname}</div>
            <div>{record.buyer_phone || "Sin teléfono"}</div>
            <div>
              {buyerAddress.address || "Sin dirección"},{" "}
              {buyerAddress.city || "Sin ciudad"},{" "}
              {buyerAddress.state || "Sin provincia"},{" "}
              {buyerAddress.country || "Sin país"}
            </div>
          </div>
        );
      },
    },
    {
      title: "Productos",
      render: (_, record) => (
        <div>
          {record.products.slice(0, 2).map((product, index) => (
            <div key={index}>
              {product.product_name} (x{product.product_amount})
            </div>
          ))}
          {record.products.length > 2 && (
            <div>+{record.products.length - 2} más...</div>
          )}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total_order_price",
      render: (price) => `$${price.toLocaleString()}`,
      sorter: (a, b) => a.total_order_price - b.total_order_price,
    },
    {
      title: "Estado Pago",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "approved" ? "green" :
            status === "rejected" ? "red" : "orange"
          }
        >
          {status?.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Tipo Pago",
      dataIndex: "payment_type",
      render: (type) => (type ? type.replace("_", " ").toUpperCase() : "N/A"),
    },
    {
      title: "Envío",
      render: (_, record) => {
        const estado = record.estadoEnvio || "pendiente";
        return (
          <div>
            <div><strong>{estado}</strong></div>
            <div>
              {record.trackSeguimiento || "Sin número"} -{" "}
              {record.trackCarrierName || "Sin transportista"}
            </div>
            {record.trackUrl && <div>{record.trackUrl}</div>}
            <div>
              <Tag
                color={
                  estado === "enviado" ? "green" :
                  estado === "cancelado" ? "red" : "orange"
                }
              >
                {estado.toUpperCase()}
              </Tag>
            </div>
          </div>
        );
      },
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleString() : "N/A"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <Button 
          icon={<AiFillEdit />} 
          onClick={() => showEditModal(record)}
          aria-label="Editar orden"
        />
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const productColumns = [
      {
        title: "#",
        render: (_, __, index) => index + 1,
        width: 50,
        align: 'center'
      },
      {
        title: "Producto",
        dataIndex: "product_name",
        key: "name",
      },
      {
        title: "Descripción",
        dataIndex: "product_description",
        key: "description",
      },
      {
        title: "Cantidad",
        dataIndex: "product_amount",
        key: "amount",
        align: 'center'
      },
      {
        title: "Precio Unitario",
        dataIndex: "product_unit_price",
        render: (price) => `$${price.toLocaleString()}`,
        key: "price",
        align: 'right'
      },
      {
        title: "Total",
        render: (_, product) =>
          `$${(
            product.product_amount * product.product_unit_price
          ).toLocaleString()}`,
        key: "total",
        align: 'right'
      },
    ];
  
    return (
      <div>
        <Table
          columns={productColumns}
          dataSource={record.products}
          pagination={false}
          rowKey="prodId"
        />
        <Descriptions bordered column={2} style={{ marginTop: 20 }}>
          <Descriptions.Item label="ID Orden">{record.id}</Descriptions.Item>
          <Descriptions.Item label="ID Pago">{record.payment_id}</Descriptions.Item>
          <Descriptions.Item label="ID Comercio">{record.merchant_order_id}</Descriptions.Item>
          <Descriptions.Item label="Preference ID">{record.preference_id}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  return (
    <div>
      <NavAdmin />
      <div >
        <Table
          style={{ backgroundColor: "rgb(245, 245, 235)" }}
          columns={columns}
          dataSource={orders}
          expandable={{ expandedRowRender }}
          rowKey="id"
        />

        <Modal
          title={`Editando Orden #${editingOrder?.id || ''}`}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => {
            form.resetFields();
            setIsModalVisible(false);
          }}
          width={800}
          okText="Guardar Cambios"
          cancelText="Cancelar"
          confirmLoading={isSubmitting}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Form.Item 
                name="status" 
                label="Estado del Pago"
                rules={[{ required: true, message: 'Seleccione el estado del pago' }]}
              >
                <Select placeholder="Seleccione estado">
                  <Option value="approved">Aprobado</Option>
                  <Option value="pending">Pendiente</Option>
                  <Option value="rejected">Rechazado</Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="payment_type" 
                label="Forma de Pago"
                rules={[{ required: true, message: 'Seleccione la forma de pago' }]}
              >
                <Select placeholder="Seleccione método">
                  <Option value="credit_card">Tarjeta de Crédito</Option>
                  <Option value="debit_card">Tarjeta de Débito</Option>
                  <Option value="bank_transfer">Transferencia Bancaria</Option>
                  <Option value="cash">Efectivo</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="mercado_pago">Mercado Pago</Option>
                  <Option value="crypto">Criptomonedas</Option>
                  <Option value="gift_card">Tarjeta de Regalo</Option>
                  <Option value="other">Otro</Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="estadoEnvio" 
                label="Estado de Envío"
                rules={[{ required: true, message: 'Seleccione el estado de envío' }]}
              >
                <Select placeholder="Seleccione estado">
                  <Option value="pendiente">Pendiente</Option>
                  <Option value="preparando">En preparación</Option>
                  <Option value="enviado">Enviado</Option>
                  <Option value="entregado">Entregado</Option>
                  <Option value="cancelado">Cancelado</Option>
                  <Option value="devuelto">Devuelto</Option>
                </Select>
              </Form.Item>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item 
                  name="trackSeguimiento" 
                  label="Número de Seguimiento"
                >
                  <Input placeholder="Ej: AB123456789" />
                </Form.Item>

                <Form.Item 
                  name="trackCarrierName" 
                  label="Transportista"
                >
                  <Input placeholder="Ej: Correo Argentino" />
                </Form.Item>
              </div>

              <Form.Item 
                name="trackUrl" 
                label="URL de Seguimiento"
                tooltip="Ingrese la URL completa de seguimiento del transportista"
              >
                <Input placeholder="https://..." />
              </Form.Item>

              <h4>Información de Envío</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item 
                  name="buyer_address" 
                  label="Dirección"
                  rules={[{ required: true, message: 'Ingrese la dirección' }]}
                >
                  <Input placeholder="Ej: Av. Corrientes 1234" />
                </Form.Item>

                <Form.Item 
                  name="buyer_city" 
                  label="Ciudad"
                  rules={[{ required: true, message: 'Ingrese la ciudad' }]}
                >
                  <Input placeholder="Ej: Buenos Aires" />
                </Form.Item>

                <Form.Item 
                  name="buyer_state" 
                  label="Provincia/Estado"
                  rules={[{ required: true, message: 'Ingrese la provincia' }]}
                >
                  <Input placeholder="Ej: CABA" />
                </Form.Item>

                <Form.Item 
                  name="buyer_country" 
                  label="País"
                  rules={[{ required: true, message: 'Ingrese el país' }]}
                >
                  <Input placeholder="Ej: Argentina" />
                </Form.Item>

                <Form.Item 
                  name="buyer_phone" 
                  label="Teléfono"
                  rules={[
                    { required: true, message: 'Ingrese el teléfono' },
                    { pattern: /^[0-9+\-()\s]+$/, message: 'Teléfono no válido' }
                  ]}
                >
                  <Input placeholder="Ej: +54 11 1234-5678" />
                </Form.Item>
              </div>
            </Space>
          </Form>
        </Modal>
      </div>
    </div>
  );
};