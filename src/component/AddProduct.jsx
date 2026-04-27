import AllFooter from "./AllFooter";
import AllHeader from "./AllHeader";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../lib/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { isLoading } = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const distpatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [productUpdate, setProductUpdate] = useState({
    adi: "",
    alkolOrani: "",
    fiyat: 0.0,
    imagesUrl: "",
    alkolBoyutu: "",
  });
  useEffect(() => {
    if (isLoading) {
      navigate("/");
    }
  }, [isLoading]);
  const handleInputChange = (e) => {
    if (e.target.name === "fiyat") {
      setProductUpdate({
        ...productUpdate,
        [e.target.name]: parseFloat(e.target.value),
      });
    }
    //console.log(e.target.name + " : " + e.target.value);
    setProductUpdate({ ...productUpdate, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.name === "cancel") {
      setProductUpdate({
        adi: "",
        alkolOrani: "",
        fiyat: 0.0,
        imagesUrl: "",
        alkolBoyutu: "",
        description: "",
        yearDate: "",
      });
      return;
    }
    if (e.target.name === "submit") {
      // console.log(productUpdate);
      if (
        productUpdate.adi === "" ||
        productUpdate.adi === null ||
        productUpdate.alkolOrani === "" ||
        productUpdate.alkolOrani === null ||
        productUpdate.alkolBoyutu === "" ||
        productUpdate.alkolBoyutu === null ||
        productUpdate.fiyat === 0 ||
        productUpdate.fiyat === null ||
        productUpdate.imagesUrl === "" ||
        productUpdate.imagesUrl === null
      ) {
        console.log(productUpdate);
        toast.error("Empty Valid please control", { position: "bottom-right" });
        setErrorMessage("Empty Valid ");
        return;
      }

      distpatch(saveProduct(productUpdate));
    }
  };
  return (
    <>
      <AllHeader />
      {user.login_user.authonticate ? (
        <div className="flex items-center justify-center p-4">
          <div className="flex w-120 items-center justify-center p-4">
            <Card className="flex bg-indigo-600 text-white dark:text-black dark:bg-white w-full items-center justify-center gap-4 p-4">
              <div className="w-full max-w-md">
                <form>
                  <FieldGroup>
                    <FieldSet>
                      <FieldLegend>Add a Product</FieldLegend>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="form-name">
                            Product Name
                          </FieldLabel>

                          <Input
                            id="name"
                            name="adi"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            placeholder="Yeni Rakı"
                            required
                            type="text"
                            value={productUpdate.adi}
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="form-alkol-orani">
                            Alkol Orani
                          </FieldLabel>

                          <Input
                            name="alkolOrani"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            id="alkolOrani"
                            placeholder="%40"
                            required
                            type="text"
                            value={productUpdate.alkolOrani}
                          />
                        </Field>
                        <FieldLabel htmlFor="form-alkol-orani">
                          Tarihi
                        </FieldLabel>

                        <Input
                          name="yearDate"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          id="yearDate"
                          placeholder="1937"
                          required
                          type="text"
                          value={productUpdate.yearDate}
                        />
                        <Field>
                          <FieldLabel htmlFor="form-price">Fiyat</FieldLabel>
                          <Input
                            name="fiyat"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            id="fiyat"
                            placeholder="750.00"
                            required
                            type="number"
                            value={productUpdate.fiyat}
                          />
                        </Field>
                        <div className="grid grid-cols-3 gap-4">
                          <Field>
                            <FieldLabel htmlFor="form-alkolBoyutu">
                              Alkol Boyutu
                            </FieldLabel>
                            <Select
                              onValueChange={(value) =>
                                setProductUpdate({
                                  ...productUpdate,
                                  alkolBoyutu: value,
                                })
                              }
                              id="alkolBoyutu"
                              name="alkolBoyutu"
                              defaultValue=""
                            >
                              <SelectTrigger>
                                <SelectValue className="" placeholder="35cl" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="35cl">35cl</SelectItem>
                                  <SelectItem value="50cl">50cl</SelectItem>
                                  <SelectItem value="70cl">70cl</SelectItem>
                                  <SelectItem value="100cl">100cl</SelectItem>
                                  <SelectItem value="150cl">150cl</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </Field>
                          <Field></Field>
                        </div>
                      </FieldGroup>
                    </FieldSet>
                    <FieldSeparator />

                    <FieldSet>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="form-product-img-url">
                            Product Img Url
                          </FieldLabel>
                          <Textarea
                            name="imagesUrl"
                            id="imagesUrl"
                            placeholder="imgurl.com"
                            className="resize-none"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={productUpdate.imagesUrl}
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="form-product-img-url">
                            Description
                          </FieldLabel>
                          <Textarea
                            name="description"
                            id="description"
                            placeholder="description"
                            className="resize-none"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={productUpdate.description}
                          />
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal">
                      <Button
                        onClick={(e) => handleSubmit(e)}
                        name="submit"
                        type="button"
                        variant="default"
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={(e) => handleSubmit(e)}
                        name="cancel"
                        type="button"
                        variant="default"
                      >
                        Cancel
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </div>
              <Field>
                {errorMessage ? (
                  <FieldDescription className="font-bold text-red-600 animate-bounce">
                    {errorMessage}
                  </FieldDescription>
                ) : (
                  <FieldDescription></FieldDescription>
                )}
              </Field>
            </Card>
          </div>
        </div>
      ) : (
        <> </>
      )}
      <AllFooter />
    </>
  );
};

export default AddProduct;
