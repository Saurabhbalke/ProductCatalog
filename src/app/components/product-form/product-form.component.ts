import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() productAdded = new EventEmitter<void>();

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading: boolean = false; 

  constructor(private productService: ProductService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // Create a FileReader to preview image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = null;
    }
  }

  // Add Product with Image Upload
  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    this.isUploading = true; 

    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData).subscribe(() => {
      alert('Product Added!');
      this.productAdded.emit(); 
      this.resetForm();
      this.isUploading = false; 
      location.reload(); 
    }, () => {
      alert('Failed to add product.');
      this.isUploading = false;
    });
  }

  // Reset Form
  resetForm() {
    this.newProduct = { name: '', description: '', price: 0, imageUrl: '' };
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
