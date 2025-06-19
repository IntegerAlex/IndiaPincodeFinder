#!/usr/bin/env python3
"""
Interactive test for IndiaPincodeFinder package
"""

from indiapincodefinder import pin_to_address, pin_to_state, pin_to_district, pin_to_taluka

def interactive_test():
    print("🔍 IndiaPincodeFinder Interactive Tester")
    print("=" * 40)
    print("Enter pincodes to test (or 'quit' to exit)")
    
    while True:
        try:
            user_input = input("\nEnter pincode: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("Goodbye! 👋")
                break
                
            pincode = int(user_input)
            
            print(f"\n📍 Results for pincode {pincode}:")
            print("-" * 30)
            
            address = pin_to_address(pincode)
            if address:
                print(f"✓ Full address: {address}")
                print(f"  🏛️  State: {pin_to_state(pincode)}")
                print(f"  🏘️  District: {pin_to_district(pincode)}")
                print(f"  🏢 Taluka/Block: {pin_to_taluka(pincode)}")
            else:
                print("❌ No data found for this pincode")
                
        except ValueError:
            print("❌ Please enter a valid number")
        except KeyboardInterrupt:
            print("\n\nGoodbye! 👋")
            break

if __name__ == "__main__":
    interactive_test() 