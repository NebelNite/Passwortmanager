﻿#pragma checksum "..\..\PasswordGenerator.xaml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "96E09AE8CAB5A80DB6DEE237E3E8BFAC551CF5DB832DA530B29F75DB029D62A5"
//------------------------------------------------------------------------------
// <auto-generated>
//     Dieser Code wurde von einem Tool generiert.
//     Laufzeitversion:4.0.30319.42000
//
//     Änderungen an dieser Datei können falsches Verhalten verursachen und gehen verloren, wenn
//     der Code erneut generiert wird.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace PasswortmanagerWPF {
    
    
    /// <summary>
    /// PasswordGenerator
    /// </summary>
    public partial class PasswordGenerator : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 15 "..\..\PasswordGenerator.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.CheckBox lowercaseCheckBox;
        
        #line default
        #line hidden
        
        
        #line 16 "..\..\PasswordGenerator.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.CheckBox uppercaseCheckBox;
        
        #line default
        #line hidden
        
        
        #line 17 "..\..\PasswordGenerator.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.CheckBox numericCheckBox;
        
        #line default
        #line hidden
        
        
        #line 18 "..\..\PasswordGenerator.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.CheckBox specialCheckBox;
        
        #line default
        #line hidden
        
        
        #line 19 "..\..\PasswordGenerator.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Slider lengthSlider;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/PasswortmanagerWPF;component/passwordgenerator.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\PasswordGenerator.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.lowercaseCheckBox = ((System.Windows.Controls.CheckBox)(target));
            return;
            case 2:
            this.uppercaseCheckBox = ((System.Windows.Controls.CheckBox)(target));
            return;
            case 3:
            this.numericCheckBox = ((System.Windows.Controls.CheckBox)(target));
            return;
            case 4:
            this.specialCheckBox = ((System.Windows.Controls.CheckBox)(target));
            return;
            case 5:
            this.lengthSlider = ((System.Windows.Controls.Slider)(target));
            return;
            case 6:
            
            #line 22 "..\..\PasswordGenerator.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.ConfirmButton_Click);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
    }
}

